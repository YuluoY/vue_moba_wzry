<template>
    <div>
        <h1>{{title}}管理员</h1>
        <el-form label-width='100px' @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model.trim="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model.trim="model.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type='submit'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'AdminUserEdit',
        props: ['id'],
        data() {
            return {
                model: {},
            }
        },
        methods: {
            async save() {
                if (this.id) {
                    await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
                } else {
                    await this.$http.post('/rest/admin_users', this.model);
                }
                // 函数式路由跳转
                this.$router.push('/admin_users/list');
                // element赠送功能...
                this.$message({
                    type: 'success',
                    message: `"${this.model.username}"管理员保存成功！`
                });
            },
            async fetch() {
                const res = await this.$http.get(`/rest/admin_users?id=${this.id}`);
                this.model = res.data;
            },
            async fetchParents() {
                const res = await this.$http.get(`/rest/admin_users`);
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