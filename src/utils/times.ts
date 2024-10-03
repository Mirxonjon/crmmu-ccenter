export const toUnixTimestamp = async (dateString: Date): Promise<number> => {
  const timestamp = Math.floor(dateString.getTime() / 1000);
  return timestamp;
};
