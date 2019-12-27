Vue.component('select2', {
    props: ['options', 'value'],
    template: `
        <div>
            <select multiple ref='select'>
                <slot></slot>
            </select>
        </div>
    `,
    mounted: function () {
        var vm = this;
        $(this.$refs.select)
            .select2({ data: this.options })
            .on('change', function (ev, args) {
                if (!(args && "ignore" in args)) {
                    vm.$emit('input', $(this).val())
                }
            });
            
        Vue.nextTick(() => {
            $(this.$refs.select)
                .val(this.value)
                .trigger('change', { ignore: true })
        });
    },
    watch: {
        value: function (value, oldValue) {
            // update value
            $(this.$refs.select)
                .val(this.value)
                .trigger('change', { ignore: true });
        },
        options: function (options) {
            // update options
            $(this.$refs.select).select2({ data: options })
        }
    },
    destroyed: function () {
        $(this.$refs.select).off().select2('destroy')
    }
});