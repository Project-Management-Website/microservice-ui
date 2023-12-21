import { updateDetailTask, createTask } from '@/api/task'
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import * as zod from "zod"
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useUserStore } from '@/stores/UserStore';
import { useSocketStore } from '@/stores/SocketStore'
import { getListUsers } from '@/api/auth';

export async function useTaskDetail(isEdit) {
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    const userStore = useUserStore()
    const useSocket = useSocketStore()

    const dropdownUsers = await getListUsers()

    const validationSchema = toTypedSchema(
        zod.object({
            title: zod.string().nonempty('This field is required'),
            assignee: zod.string().nonempty('This field is required'),
            status: zod.string().optional(),
            priority: zod.string().nonempty('This field is required'),
            due_date: zod.date().or(zod.string()),
            description: zod.string().nonempty('This field is required'),
        })
    );

    const { handleSubmit , setValues, values } = useForm({
        validationSchema,
    })

    const onSubmit = handleSubmit(async () => {
        try {
            const assigneeInfo = await dropdownUsers.value.find(({ uuid }) => uuid === values.assignee)
            
            const taskForm = {
                ...values,
                assignee: {
                    uuid: assigneeInfo.uuid,
                    username: assigneeInfo.username,
                },
                reporter: {
                    uuid: userStore.userInfo.user_uuid,
                    username: userStore.userInfo.username,
                }
            }
            if (isEdit) {
                await updateDetailTask(taskForm, route.params.uuid)
            } else {
                const tempTask = {
                    ...taskForm,
                    status: 'To do',
                }
                useSocket.socket.emit("notif:create", {
                    receiver: assigneeInfo.uuid,
                })

                await createTask(tempTask)
            }
            
            router.push({ path: "/task"})
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: `${error}`, life: 3000 });
        }
    })
    return {
        dropdownUsers,
        onSubmit,
        setValues
    }
}