export default function (diffHeight = 0) {
  const height = ref(200)
  function setHeight() {
    nextTick(() => {
      const mainEl = document.querySelector('.layout-container__box')
      height.value = (mainEl?.clientHeight || 0) - 40
      const tableFooterEl = document.querySelector('.kk-pagination')
      const tableHeaderEl = document.querySelector('.kk-table-header')
      const tableActionsEl = document.querySelector('.kk-table-actions')

      height.value -= tableFooterEl?.clientHeight ?? 0
      height.value -= tableHeaderEl?.clientHeight ?? 0
      height.value -= tableActionsEl?.clientHeight ?? 0
      height.value -= diffHeight
    })
  }
  setHeight()
  return { height, resetHeight: setHeight }
}
