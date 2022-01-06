const subscribers = [];

export const handleChange = (path, value, previousValue, applyData) => {
  subscribers.forEach(
    (callSubscriber) => callSubscriber(path, value, previousValue, applyData),
  );
};

export const subscribe = (subscriber) => {
  subscribers.push(subscriber);
  return () => {
    const subscriberIndex = subscribers.indexOf(subscriber);
    subscribers.splice(subscriberIndex, 1);
  };
};
