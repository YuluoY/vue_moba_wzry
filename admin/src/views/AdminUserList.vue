<template>
    <div>
        <h1>管理员列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width='220'></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column fixed="right" label="操作" width="90">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'AdminUserList',
        data() {
            return {
                items: []
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/admin_users');
                this.items = res.data;
            },
            async del(row) {
                this.$confirm(`是否要删除"${row.username}"管理员？`, '💖提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        await this.$http.delete(`/rest/admin_users/${row._id}`);
                        this.$message({
                            type: 'success',
                            message: `"${row.username}"管理员删除成功！`
                        })
                        this.fetch();
                    } catch (error) {
                        this.$message({
                            type: 'error',
                            message: `"${row.username}"管理员删除错误，请稍后再试！`
                        })
                    }
                })
            },
            edit(id) {
                this.$router.push(`/admin_users/edit/${id}`);
            }
        },
        created() {
            this.fetch();
        }
    }
</script>

<style>

</style>