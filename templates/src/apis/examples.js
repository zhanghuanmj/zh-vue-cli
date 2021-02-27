/**
 * 例子的接口
 * @module examples
 * @author zhanghuan
 * @date 2021/02/26
 */
const { mockPrefix } = window._CONFIG

export default {
    listTeacher: `${mockPrefix}/listTeacher`,
    add: `${mockPrefix}/addTeacher`,
    edit: `${mockPrefix}/editTeacher`,
    deleteTeacher: `${mockPrefix}/deleteTeacher`,
    upload: `${mockPrefix}/upload`,
}