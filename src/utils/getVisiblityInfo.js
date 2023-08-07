export default function getVisiblityInfo(data) {
  const isEveryHidden = data.every(({ visible }) => !visible);
  const isEmpty = data?.length == 0;
  const isEveryChecked =
    !isEveryHidden && data.every(({ checked, visible }) => !visible || checked);
  const isAnyChecked =
    !isEveryHidden && data.some(({ checked, visible }) => visible && checked);

  return {
    isEveryHidden,
    isEmpty,
    isEveryChecked,
    isAnyChecked,
  };
}
