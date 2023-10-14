export function oneMonthDeadline() {
  const currentDate = new Date()
  const deadlineDate = new Date(currentDate)
  deadlineDate.setMonth(currentDate.getMonth() + 1)
  const formattedDate = deadlineDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return formattedDate;
}