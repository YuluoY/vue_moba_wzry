<template>
    <div>
        <h1>文章列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width='220'></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
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
        name: 'ArticleList',
        data() {
            return {
                items: []
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('/rest/articles');
                this.items = res.data;
            },
            async del(row) {
                this.$confirm(`是否要删除"${row.title}"文章？`, '💖提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    try {
                        await this.$http.delete(`/rest/articles/${row._id}`);
                        this.$message({
                            type: 'success',
                            message: `"${row.title}"分类删除成功！`
                        })
                        this.fetch();
                    } catch (error) {
                        this.$message({
                            type: 'error',
                            message: `"${row.title}"分类删除错误，请稍后再试！`
                        })
                    }
                })
            },
            edit(id) {
                this.$router.push(`/articles/edit/${id}`);
            }
        },
        created() {
            this.fetch();
        }
    }
</script>

<style>

</style>