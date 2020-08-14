export const increment = (state) => {
  // 变更状态
  state.count++
}

export const SET_PAY_TEMP_OBJ = (state, value) => {
  state.payTempObj = value
}
