<template>
    <div>
        <h1>{{title}}分类</h1>
        <el-form label-width='100px' @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model.trim="model.parent" ref="select">
                        <el-option 
                            v-for="item in parents" 
                            :key="item._id" :label="item.name" 
                            :value="item._id">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model.trim="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'CategoryEdit',
        props: ['id'],
        data() {
            return {
                model: {},
                parents: []
            }
        },
        methods: {
            async save() {
                if (this.id) {
                    await this.$http.put(`/rest/categories/${this.id}`, this.model);
                } else {
                    await this.$http.post('/rest/categories', this.model);
                }
                // 函数式路由跳转
                this.$router.push('/categories/list');
                // element赠送功能...
                this.$message({
                    type: 'success',
                    message: `"${this.model.name}"分类保存成功！`
                });
            },
            async fetch() {
                const res = await this.$http.get(`/rest/categories?id=${this.id}`);
                this.model = res.data;
            },
            async fetchParents() {
                const res = await this.$http.get(`/rest/categories`);
                this.parents = res.data;
            },
        },
        computed: {
            title() {
                return this.id ? '编辑' : '新建';
            },
        },
        created() {
            this.fetchParents();
            this.id && this.fetch()
        }
    }
</script>

<style>

</style>