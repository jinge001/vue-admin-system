<template>
	<div class="login-wrap">
		<div class="ms-login">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input style="width: 100%" v-model="ruleForm.username" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input style="width: 100%" type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				</div>
			</el-form>
		</div>
		</div>
	</div>
</template>

<script>
	import store from '../store'
	export default {
		data: function(){
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				// 模拟登陆返回数据
				res: {
                	code: "0",
					data: {
						auth_key: "PiSO9Ee5yh36P_a9EVlqCa8_puhvwHri",
						avatar: "http://v1.admin.com/data/upload/avatar/20190720033336_584.jpg",
						last_login_time: "1600132392",
						login_time: 1600133191,
						user_name: "admin",
					},
					extend: {
						rules:[
							{
								create_time: "1590631375",
								desc: "table表格",
								icon: "iconfont icon-fenlei",
								id: "2",
								is_menu: "1",
								name: "table表格",
								path: "",
								pid: "0",
								sort: "1",
								type: "1",
							},
							{
								create_time: "1553951425",
								desc: "table表格demo",
								icon: "iconfont icon-gouxuan1",
								id: "1",
								is_menu: "1",
								name: "table表格demo",
								path: "/page/table/tabledemo",
								pid: "2",
								sort: "1",
								type: "1",
							},
							{
								create_time: "1590631375",
								desc: "菜单管理",
								icon: "iconfont icon-fenlei",
								id: "8",
								is_menu: "1",
								name: "系统设置",
								path: "",
								pid: "0",
								sort: "6",
								type: "1",
							},
							{
								create_time: "1553951425",
								desc: "用户角色",
								icon: "iconfont icon-gouxuan1",
								id: "37",
								is_menu: "1",
								name: "角色列表",
								path: "/page/auth/role_list",
								pid: "8",
								sort: "2",
								type: "1",
							},
							{
								create_time: "1555163817",
								desc: "菜单列表",
								icon: "iconfont icon-gouxuan1",
								id: "33",
								is_menu: "1",
								name: "菜单列表",
								path: "/page/auth/menu_list",
								pid: "8",
								sort: "1",
								type: "1",
							},
							{
								create_time: "1590504882",
								desc: "用户列表",
								icon: "iconfont icon-gouxuan1",
								id: "38",
								is_menu: "1",
								name: "账号管理",
								path: "/page/auth/user_list",
								pid: "8",
								sort: "3",
								type: "1",
							},

						],
						rules_tree: [
							{
								create_time: "1590631375",
								desc: "菜单管理",
								icon: "iconfont icon-fenlei",
								id: "8",
								is_menu: "1",
								name: "系统设置",
								path: "",
								pid: "0",
								sort: "6",
								type: "1",
								children: [
									{
										create_time: "1553951425",
										desc: "用户角色",
										icon: "iconfont icon-gouxuan1",
										id: "37",
										is_menu: "1",
										name: "角色列表",
										path: "/page/auth/role_list",
										pid: "8",
										sort: "2",
										type: "1",
									},
									{
										create_time: "1555163817",
										desc: "菜单列表",
										icon: "iconfont icon-gouxuan1",
										id: "33",
										is_menu: "1",
										name: "菜单列表",
										path: "/page/auth/menu_list",
										pid: "8",
										sort: "1",
										type: "1",
									},
									{
										create_time: "1590504882",
										desc: "用户列表",
										icon: "iconfont icon-gouxuan1",
										id: "38",
										is_menu: "1",
										name: "账号管理",
										path: "/page/auth/user_list",
										pid: "8",
										sort: "3",
										type: "1",
									},
								]
							},
							{
								create_time: "1590631375",
								desc: "table表格",
								icon: "iconfont icon-fenlei",
								id: "2",
								is_menu: "1",
								name: "table表格",
								path: "",
								pid: "0",
								sort: "1",
								type: "1",
								children: [
									{
										create_time: "1553951425",
										desc: "table表格demo",
										icon: "iconfont icon-gouxuan1",
										id: "1",
										is_menu: "1",
										name: "table表格demo",
										path: "/page/table/tabledemo",
										pid: "2",
										sort: "1",
										type: "1",
									},
								]
							},
						]
					}
				}
			}
		},
		created() {
			 if(location.href.indexOf("#reloaded")==-1){
				location.href=location.href+"#reloaded";
				location.reload();
			}            
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.ruleForm);
						// api.login(this.ruleForm).then(res => {
							// console.log(res);
							if(this.ruleForm.username == 1 && this.ruleForm.password == 1 ){
								
								//设置路由
								// this.$store.commit('getuserinfo',this.res.data)
								store.dispatch('GenerateUsers',this.res.data);
								window.sessionStorage.clear();
								window.localStorage.setItem('key',this.res.data.auth_key);
								window.localStorage.setItem('userInfo',JSON.stringify(this.res.data));
								this.set_url(this.res.extend);                               
							}

						// })
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},
			//设置路由 GenerateRoutes
			set_url(data){
				let rules = data.rules;
				store.dispatch('GenerateRoutes',rules).then(() => {
					this.$router.addRoutes(store.getters.addRouters) 
					localStorage.setItem('rules', JSON.stringify(rules))
					this.$router.push('/page/dashboard');
				});
				// console.log(data.rules_tree);
				window.localStorage.setItem('role_menu',JSON.stringify(data.rules_tree));

			}
		}
	}
</script>

<style scoped lang="scss">
    .login-wrap{
        position: relative;
        width:100%;
        min-height: 100%;
        height:100%;
        background-image: url('../assets/login-bg.jpg');
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>