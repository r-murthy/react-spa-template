export function taskFn(renderAppElements) {
  return async function (task) {
    let notification;
    try {
      renderAppElements({ isLoading: true });
      return await task;
    } catch (error) {
      notification = error.message;
      return Promise.reject(error);
    } finally {
      renderAppElements({
        isLoading: false,
        notification,
      });
    }
  };
}
