Vue.directive('checked', {
    inserted: function (el) {
        el.checked();
    }
})

var vm = new Vue({
    el: '#app',
    data: {
        newTodos: '',
        state: '',
        msg: [{ id: 1, desc: '敲代码', completed: false, flag: false },
        { id: 2, desc: '拼命敲代码', completed: false, flag: false }
        ]
    }
})