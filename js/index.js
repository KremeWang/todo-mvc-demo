// 定义本地 存储方法
var key = 'vue_todos'
var localStorage_todos = {
    gets() { // 本地存储
        var strArr = localStorage.getItem(key) || '[]' // 获取到本地存储数据
        var arr = JSON.parse(strArr) // 转换为数组
        return arr // 返回
    },
    sets(todos) { // 本地获取
        window.localStorage.setItem(key, todos)
    }
}

var vm = new Vue({
    el: '#app',
    data: {
        // 1. 初始数据展示
        todos: localStorage_todos.gets(), // 初始展示本地数据
        newTodo: '',
        isEditing: null,
        temdesc: null,
        allSelected: false,
        isSeleted: 'all'
    },
    methods: {
        //添加todos任务选项
        addTodo() {
            this.newTodo = this.newTodo.trim();
            if (!this.newTodo) return;
            // 往todos中添加
            this.todos.push({
                id: +new Date(),
                desc: this.newTodo,
                completed: false
            })
            // 重置newToto为空
            this.newTodo = '';
        },
        //删除任务
        delTodo(item) {
            // console.log(item)
            let index = this.todos.indexOf(item);// 获取要删除的索引
            this.todos.splice(index, 1);// 删除
        },
        //编辑任务
        editTodo(item) {
            this.temdesc = item.desc;
            this.isEditing = item.id;
        },
        //编辑完成
        editDone(item) {
            if (!this.isEditing) {
                return;
            }
            if (!item.desc) {
                this.delTodo(item);
            }
            this.isEditing = null;
        },
        //取消编辑
        cancelEdit(item) {
            // console.log(this.temdesc)
            item.desc = this.temdesc;
            this.isEditing = null;
        },
        //全部选中
        toggleAll() {
            this.todos.forEach(item => {
                item.completed = this.allSelected;
            })
        },
        //已完成的选项
        isCompleted() {
            var flag = true;
            this.todos.forEach(item => {
                if (!item.completed) {
                    flag = false;
                }
            })
            this.allSelected = flag;
        },
        //清除已完成的
        clearDone() {
            var arr = this.todos.filter(item => {
                return !item.completed;
            })
            this.todos = arr;
        },
        //未完成的
        filterTodo(val = 'all') {
            this.isSeleted = val;
        }
    },
    //自定义属性，自动获取焦点
    directives: {
        autoFocus(el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    },
    //计算属性
    computed: {
        //没有完成的项目数量
        rest() {
            var arr = this.todos.filter(item => {
                return !item.completed;
            })
            return arr.length;
        },
        newTodos() {
            if (this.isSeleted == 'all') {
                return this.todos;
            } else if (this.isSeleted == 'active') {
                return this.todos.filter(item => {
                    return !item.completed;
                })
            } else {
                return this.todos.filter(item => {
                    return item.completed;
                })
            }
        }
    },
    watch: {
        'todos': {  // 对this.todos深度监听  一旦todos发生更改 则重新存储到本地
            handler(todos) {
                // console.log(todos)
                localStorage_todos.sets(JSON.stringify(todos));
            },
            deep: true
        },

    }
})