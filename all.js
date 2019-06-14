
var app = new Vue({
    el: "#app",
    data: {
        todo: "",
        newList: [],
        showActive: "all",
        cacheList: {},
        cacheTitle: ""
    },
    methods: {
        addList() {
        let timestamp = Math.floor(Date.now());
        let value = this.todo.trim();
        if (!value) {
            return;
        } else {
            this.newList.push({
            id: timestamp,
            title: value,
            check: false
            });
        }
        this.todo = "";
        },
        remove(list) {
        let vm = this;
        let indexId = vm.newList.findIndex(function(item, key) {
            return list.id === item.id;
        });
        this.newList.splice(indexId, 1);
        },
        editList(list) {
        this.cacheList = list;
        this.cacheTitle = list.title;
        },
        canceEdit() {
        this.cacheList = {};
        },
        doneList(list) {
        list.title = this.cacheTitle;
        this.cacheTitle = "";
        this.cacheList = {};
        },
        cleanList() {
        let vm = this;
        vm.newList = [];
        }
    },
    computed: {
        filter() {
        if (this.showActive == "all") {
            return this.newList;
        } else if (this.showActive == "conduct") {
            let conductList = [];
            this.newList.forEach(function(item) {
            if (!item.check) {
                conductList.push(item);
            }
            });
            return conductList;
        } else if (this.showActive == "complete") {
            let completeList = [];
            this.newList.forEach(function(item) {
            if (item.check) {
                completeList.push(item);
            }
            });
            return completeList;
        }
        },
        undone() {
        let vm = this;
        let checkFilter = [];
        vm.newList.forEach(function(item) {
            if (item.check === false) {
            checkFilter.push(item);
            }
        });
        return checkFilter.length;
        }
    }
});
Î