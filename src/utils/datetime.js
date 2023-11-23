export function formatDatetime (timestamp) {

    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Ho_Chi_Minh',
      });

    return formattedDate
}