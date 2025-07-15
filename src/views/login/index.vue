<template>
    <div class="login_container">
        <canvas ref="bgCanvas" class="bg-canvas"></canvas>
        <el-row>
            <el-col :span="14" :xs="0"></el-col>
            <el-col :span="10" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎访问莱茵数据中心</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon=User placeholder="请输入用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon=Lock placeholder="请输入密码" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入用户相关小仓库
import useuseStore from '@/store/modules/user';
import { lo } from 'element-plus/es/locales.mjs';
import { triggerEvent } from 'element-plus/es/utils/index.mjs';
let useStore = useuseStore();
//获取路由器
let loginForms = ref();
let $router = useRouter();
//收集账号与密码的数据
let loading = ref(false);
//控制按钮加载


let loginForm = reactive({
    username: 'admin',
    password: '111111'
});
//定义表单校验需要配置对象

const login = async () => {
    //保证全部表单项校验通过才能发请求
    await loginForms.value.validate();

    loading.value = true;
    try {
        //保证登录成功

        await useStore.handleLogin(loginForm);
        $router.push('/'); // 登录成功后跳转到首页
        ElNotification({
            title: '登录成功',
            message: '欢迎回来！',
            type: 'success',
            duration: 3000
        });
        loading.value = false;
    } catch (error) {
        loading.value = false;
        ElNotification({
            title: '登录失败',
            message: '请检查用户名和密码是否正确',
            type: 'error',
            duration: 3000
        })

    }
}

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度需为3到10个字符', trigger: 'blur' }
    ],
    //trigger: 'blur' 失去焦点时验证
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 16, message: '密码长度需为3到16个字符', trigger: 'blur' }
    ]
}

const bgCanvas = ref(null);

onMounted(() => {
            const cvs = bgCanvas.value;
            const ctx = cvs.getContext('2d');
            cvs.width = window.innerWidth;
            cvs.height = window.innerHeight;

            function getRandom(min, max) {
                return Math.random() * (max - min) + min;
            }
            class Point {
                constructor(minSpeed, maxSpeed) {
                    this.r = 6;
                    this.x = getRandom(0, cvs.width - this.r / 2);
                    this.y = getRandom(0, cvs.height - this.r / 2);
                    // 随机速度
                    this.vx = getRandom(minSpeed, maxSpeed) * (Math.random() < 0.5 ? 1 : -1);
                    this.vy = getRandom(minSpeed, maxSpeed) * (Math.random() < 0.5 ? 1 : -1);
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    // 边界反弹
                    if (this.x < this.r) {
                        this.x = this.r;
                        this.vx *= -1;
                    }
                    if (this.x > cvs.width - this.r) {
                        this.x = cvs.width - this.r;
                        this.vx *= -1;
                    }
                    if (this.y < this.r) {
                        this.y = this.r;
                        this.vy *= -1;
                    }
                    if (this.y > cvs.height - this.r) {
                        this.y = cvs.height - this.r;
                        this.vy *= -1;
                    }
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                }
            }

            class Graph {
                constructor(pointNumber = 30, maxDis = 500, minSpeed = 0.5, maxSpeed = 1.5) {
                    this.points = new Array(pointNumber).fill(0).map(() => new Point(minSpeed, maxSpeed));
                    this.maxDis = maxDis;
                }
                update() {
                    for (let p of this.points) {
                        p.update();
                    }
                }
                draw() {
                    for (let i = 0; i < this.points.length; i++) {
                        const p1 = this.points[i];
                        p1.draw();
                        for (let j = i + 1; j < this.points.length; j++) {
                            const p2 = this.points[j];
                            const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                            if (d > this.maxDis) continue;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - d / this.maxDis})`;
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }
                }
            }
            // 可调速度上下限
            const g = new Graph(30, 300, 0.05, 0.15);

            function animate() {

                const gradient = ctx.createLinearGradient(0, 0, 0, cvs.height);
gradient.addColorStop(0, '#333');
gradient.addColorStop(1, '#1f1e33');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                g.update();
                g.draw();
                requestAnimationFrame(animate);
            }
            animate();

            // 可选：窗口大小变化时自适应
            window.addEventListener('resize', () => {
                cvs.width = window.innerWidth;
                cvs.height = window.innerHeight;
            });
        });

</script>

<style scoped>
.bg-canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none; /* 防止遮挡表单点击 */
}
.login_container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.login_form, .el-row, .el-col {
  position: relative;
  z-index: 1;
}
.login_container {
    width: 100%;
    height: 100vh;
    /*background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;*/
}

.login_form {
    position: relative;
    width: 50%;
    top: 30vh;
    /*background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;*/

    h1 {
        color: white;
        font-size: 40px;
    }
}

.login_form h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
}

.login_btn {
    width: 100%;
    height: 40px;

    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}
</style>
