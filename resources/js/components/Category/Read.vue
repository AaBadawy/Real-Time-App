<template>
    <v-container>
            <v-form @submit.prevent="submit" >
                <v-text-field
                    label="Category Name"
                    type="text"
                    v-model="form.name"
                    required
                    ></v-text-field>
                    <div>
                        <span class="red--text mb-1" v-if="errors.name && !submitStatus">{{errors.name[0]}}</span>
                    </div>
                    <v-btn class="mr-4" color="green" type="submit" v-if="!editSlug" :disabled="disabled">Craete </v-btn>
                    <div  v-else>
                    <v-btn class="mr-4" color="red" type="submit" :disabled="disabled">Update </v-btn>
                    <v-btn @click="cancel" v-if="form.name" color="orange"><v-icon dark left>mdi-arrow-left</v-icon>Back</v-btn>
                    </div>
            </v-form>
            <v-card class="mt-2">
            <v-toolbar color="indigo" dark dense >
                <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>
            <v-list flat>
                <v-list-item-group >
                    <v-list-item v-for="(category,index) in categories" :key="category.id">
                        <v-list-item-action>
                            <v-btn icon small @click="edit(index)">
                                <v-icon color="orange">mdi-pencil</v-icon>
                            </v-btn>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{category.name}}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon small @click="destroy(category.slug,index)">
                                <v-icon color="error">mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            categories:{},
            form:{
                name:null,
            },
            category:{},
            editSlug:null,
            errors : {},
            submitStatus : false,
        }
    },
    created(){
        if(!User.isAdmin()){
            this.$router.push('/forum')
        }
        axios.get(`/api/category`)
        .then(res => this.categories = res.data.data)
    },
    computed:{
        disabled(){
            return !(this.form.name)
        }
    },
    methods:{
        destroy(slug,index){
            axios.delete(`/api/category/${slug}`)
            .then(res => this.categories.splice(index,1))
        },
        submit(){
            this.editSlug ? this.update() : this.create()
        },
        create(){
            axios.post('/api/category',this.form)
            .then(res => {
                this.categories.unshift(res.data)
                this.form.name = null
                this.submitStatus = true
            })
            .catch(error => this.errors = error.response.data.errors)
        },
        update(){
            axios.patch(`/api/category/${this.editSlug}` ,this.form)
            .then(res => {
                this.categories.unshift(res.data)
                this.form.name = null
                this.editSlug = null
                this.submitStatus = true
            })
            .catch(error => this.errors = error.response.data.errors)
        },
        edit(index){
            this.category = this.categories[index]
            this.form.name = this.categories[index].name
            this.editSlug = this.categories[index].slug
            this.categories.splice(index,1)
        },
        cancel(){
            this.categories.unshift(this.category)
            this.form.name = null
            this.editSlug = null
            this.submitStatus = true
        }
    }
}
</script>

<style>

</style>