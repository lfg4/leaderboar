import firebase from 'https://lfg4.github.io/leaderboar/firebase.js';

const html = `
<html id="leaderboard">
<head>
    <title>Embed Onirix Studio experiences</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap');
    </style>
    <link rel="stylesheet" type="text/css" href="https://lfg4.github.io/leaderboar/embed-experience.css">
    <script type="module" defer src="https://lfg4.github.io/leaderboar/firebase.js" ></script>
    <script type="module" defer src="https://lfg4.github.io/leaderboar/embed-experience.js" ></script>
</head>
<body>
    <main id="oex-main" class="oex-main">
        <img class="oex-logo" src="https://lfg4.github.io/leaderboar/assets/ox-logo.svg" />
        <section id="oex-landing">
            <img class="oex-exp" src="https://lfg4.github.io/leaderboar/assets/exp.webp" />
            <h1>Welcome to Binball!</h1>
            <p>Would you like to win a free Studio Onirix account?</p>
            <p>Pocket the highest number of balls in the garbage and you will have a chance to be chosen in the draw for three annual Studio Onirix commercial licenses.</p>
            <p>Check the legal terms and conditions of the sweepstakes at <a href="linktr.ee/onirix">linktr.ee/onirix</a></p>
            <div class="oex-button-area">
                <button id="oex-play" type="button">Play now</button>
            </div>
        </section>
        <section class="oex-register-form oex-hide">
            <h1>We need some info from you to play</h1>
            <form>
                <div>
                    <label>Name</label>
                    <input id="oex-name" type="text" placeholder="How should we address you?" required />
                </div>
                <div>
                    <label>Nickname</label>
                    <input id="oex-nickname" type="text" placeholder="Your name on the leaderboard" required />
                </div>
                <div>
                    <label>Corporate email</label>
                    <input id="oex-email" type="email" placeholder="A corporate one is always better" required />
                </div>
                <div>
                    <label>Password</label>
                    <input id="oex-password" type="password" minlength="6" required placeholder="Don't worry, we don't spam phone"/>
                </div>
                <div class="oex-checkbox">
                    <input type="checkbox" required />
                    <label>Accept the 
                        <a target="_blank" href="https://www.onirix.com/es/politica-de-privacidad/">privacy policy</a> 
                        and the <a href="https://www.onirix.com/es/condiciones-generales-contratacion/">Terms of use</a></label>
                </div>
                <div class="oex-checkbox">
                    <input type="checkbox" id="oex-newsletter" />
                    <label>I want to join the Newsletter and receive news and updates.</label>
                </div>
            </form>
            <div class="oex-button-area">
                <button type="button" id="oex-register">Let's get started</button>
                <p>Do you have an account? <a id="oex-gotologin">Login now</a></p>
            </div>
        </section>
        <section class="oex-login-form oex-hide">
            <h1>Login</h1>
            <p>Enter your credentials to play again.</p>
            <form>
                <div>
                    <label>Email</label>
                    <input id="oex-login-email" type="email" placeholder="example@onirix.com" required />
                </div>
                <div>
                    <label>Password</label>
                    <input id="oex-login-password" type="password" minlength="6" required placeholder="Don't worry, we don't spam phone" />
                </div>
            </form>
            <div class="oex-button-area">
                <button type="button" id="oex-login">Let's get started</button>
                <p>Don't you have an account? <a id="oex-gotoregister">Register now</a></p>
            </div>
        </section>
        <section class="oex-leaderboard oex-hide">
            <h1>Leaderboard</h1>
            <p>This is your score at the moment</p>
            <div class="oex-leaderboard__list">
            </div>
            <div class="oex-button-area">
                <button type="button" id="oex-playagain">Try again</button>
            </div>
        </section>
    </main>
</body>
</html>
<style>
body {
    background-color: #fff;
    font-family: "Open Sans";
    font-size: 16px;
    color: #211f1f;
    margin: 0;
}

iframe {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0;
    bottom: 0;
    z-index: 999;
    max-width: 100vw;
    width: 100%;
    height: 100%;
    display: block;
    border: none;
}

#ox-leaderboard {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0;
    bottom: 0;
    z-index: 999;
    max-width: 100vw;
    width: 100%;
    height: 100%;
    display: block;
    border: none;
    background-color: #fff;
    font-family: "Open Sans";
    font-size: 16px;
    color: #211f1f;
    margin: 0;
}

.oex-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    margin: auto;
    padding: 30px;
    height: calc(100% - 60px);
}

.oex-main section {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.oex-main .oex-logo {
    width: 108px;
}

.oex-exp {
    border-radius: 10px;
    max-width: 100%;
    margin: 20px auto 0 auto;
}

.oex-main h1 {
    font-size: 25px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.24;
    margin: 20px 0 20px 0;
}

.oex-main p {
    line-height: 1.38;
    margin: -10px 0 20px 0;
}

.oex-button-area {
    margin-top: auto;
    padding: 30px;
    background-color: #580088;
    margin: -30px;
    margin-top: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.oex-leaderboard .oex-button-area {
    margin: auto -30px -15px -30px;
}

.oex-button-area p {
    font-size: 13px;
    line-height: 1.38;
    text-align: center;
    color: #fff;
    margin: 16px 0 0 0;
}

button {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    color: #fff;
    background-color: #ee0979;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 50px;
    padding: 12px;
}

.oex-hide {
    display: none !important;
}

form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    height: calc(100% - 110px);
    overflow-y: overlay;
}

form > div {
    display: flex;
    flex-direction: column;
}

form > div label {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.43;
}

form > div input {
    height: 55px;
    margin: 4px 0 10px 0;
    padding: 0 18px;
    border-radius: 8px;
    border: solid 1px #b6b1b9;
    background-color: #fff;
    font-size: 16px;
}

form > div input::placeholder {
    font-style: italic;
}

.oex-checkbox {
    display: flex;
    align-items: center;
    margin-top: 16px;
    flex-direction: row;
}

.oex-checkbox label {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.43;
    margin-left: 12px;
}

a, a:visited {
    color: #ee0979;
}

input[type="checkbox"] {
    width: 39px;
    height: 34px;
    margin: 0;
    padding: 0;
}

.oex-submitted input:required:invalid {
    border-color: #e90e0e;
}
.oex-submitted input[type="checkbox"]:required:invalid + label{
    color: #e90e0e;
}

form p.oex-error {
    color: #e90e0e;
    margin: 16px 0 0 0;
    text-align: center;
    font-weight: bold;
}

.oex-leaderboard {
    display: flex;
    flex-direction: column;
}

.oex-leaderboard__list {
    overflow-y: auto;
    overflow-y: overlay;
    scrollbar-width: thin;
    scrollbar-color: transparent;
    height: calc(100% - 110px);
}

.oex-leaderboard__list::-webkit-scrollbar-track {
    background: transparent;
}
.oex-leaderboard__list::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: none;
}

.oex-leaderboard__list ul {
    list-style: none;
    margin: 0;
    padding: 0 0 30px 0;
}

.oex-leaderboard__list ul li {
    display: flex;
    align-items: center;

    width: calc(100% - 42px);
    height: calc(50px - 32px);
    padding: 15px 20px;
    border-radius: 10px;
    border: solid 1px #e3e1e5;
    background-color: #f2f1f3;

    margin-top: 10px;
}

.oex-leaderboard__list ul li > span {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.43;
}

.oex-leaderboard__list ul li > span:not(:first-child) {
    margin-left: 28px;
}

.oex-leaderboard__list ul li > *:nth-child(3) {
    margin-left: auto !important;
}

.oex-leaderboard__list ul li:first-of-type {
    margin-top: 0;
    background-color: #51007d;
    background-image: url('./assets/combined-shape.svg');
    background-position: center;
    height: calc(70px - 52px);
    padding: 25px 20px;
}

.oex-leaderboard__list ul li:first-of-type > span {
    color: white;
}

.oex-leaderboard__list ul li:first-of-type > span:nth-child(2) {
    font-weight: 800;
    font-size: 16px;
    line-height: 1.25;
}

.oex-leaderboard__list ul li > svg {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.43;
    margin-right: 10px;
    width: 10px;
    height: 12px;
}

.oex-leaderboard__list ul li:first-child > svg g {
    fill: white;
}

.oex-leaderboard__list ul li.oex-currentuser:not(:first-child) > span {
    color: #580088;
}

.oex-leaderboard__list ul li.oex-currentuser > span:last-child {
    margin-left: 0;
}

.oex-leaderboard__list ul li.oex-currentuser:not(:first-child) {
    border: solid 2px #580088;
    width: calc(100% - 44px);
    height: calc(50px - 34px);
}

</style>
`
class OxLeaderBoard {
    studioFrame;

    experienceUrl = "https://studio.onirix.com/projects/8721b3088abb44ea83f87dd972e3b3b5/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMjgwLCJwcm9qZWN0SWQiOjUyNDA1LCJyb2xlIjozLCJpYXQiOjE2OTI3MDUxMDF9.7OgQHOLBUGpnqHdMo_j29C2-okgyDqgWlQHSK13Qpl0&background=alpha&preview=false&hide_controls=false&ar_button=false";
    firebaseController = new firebase.FirebaseController();
    userData;
    userCredential;


    main;
    leaderboard;
    landing;
    registerForm;
    loginForm;
    registerButton;
    loginButton;
    erMsg;

    userSVG = `<svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><g fill="#580088" fill-rule="evenodd"><path d="M5.055 5.928c1.584 0 2.872-1.33 2.872-2.964S6.64 0 5.055 0C3.47 0 2.182 1.33 2.182 2.964c0 1.635 1.289 2.964 2.873 2.964M5 6.24c-2.757 0-5 2.315-5 5.16 0 .331.26.6.582.6h8.836a.591.591 0 0 0 .582-.6c0-2.845-2.243-5.16-5-5.16"/></g></svg>`;

    constructor() {
        this.includeHTML()
        this.main = document.getElementById("oex-main");
        this.leaderboard = document.querySelector(".oex-leaderboard");
        this.landing = document.getElementById('oex-landing');
        this.registerForm = document.querySelector('.oex-register-form');
        this.loginForm = document.querySelector('.oex-login-form');
        this.registerButton = document.getElementById('oex-register');
        this.loginButton = document.getElementById('oex-login');
        window.addEventListener("message", (ev) => this.processMessage(ev));
        this.erMsg = document.createElement('p');
        this.erMsg.classList.add('oex-error');
        document.getElementById('oex-gotoregister').addEventListener("click", () => this.toggleForms());
        document.getElementById('oex-gotologin').addEventListener("click", () => this.toggleForms());

        document.getElementById('oex-play').addEventListener("click", () => {
            this.checkCredentials()
        })
        
    }

    includeHTML() {
        document.getElementById("ox-leaderboard").innerHTML = html
        
    }
    /**
     * Create the iframe that will link the experience
     * onload send a message with user's data.
     */
    loadExperience() {
        this.studioFrame = document.getElementById("oex-frame")
        if (null == this.studioFrame) {
            this.studioFrame = document.createElement('iframe');
            this.studioFrame.id = "studioFrame";
            this.studioFrame.allow = "autoplay;camera;gyroscope;accelerometer;magnetometer;fullscreen;xr-spatial-tracking;geolocation;";
            document.body.appendChild(this.studioFrame);
        }
        this.studioFrame.src = this.experienceUrl;
        this.main.classList.add("oex-hide");
    }

    /**
     * Check if there is already a logged user
     * If there is, retrieve its data and go to the experience.
     * If there isn't go to register.
     */
    checkCredentials() {
        this.userCredential = JSON.parse(localStorage.getItem("oex-user"));
        if (this.userCredential) {
            this.getUserData().then(() => this.loadExperience());
        } else {
            this.landing.classList.add('oex-hide');
            this.registerForm.classList.remove('oex-hide');
            this.registerButton.addEventListener("click", () => this.register());
            this.loginButton.addEventListener("click", () => this.login());
        }
    }

    /**
     * 
     */
    register() {
        const form = document.querySelector('.oex-register-form form');
        if (form.checkValidity() === true) {
            const user = {
                email: document.getElementById('oex-email').value,
                name: document.getElementById('oex-name').value,
                nickname: document.getElementById('oex-nickname').value,
                password: document.getElementById('oex-password').value,
                newsletter: document.getElementById('oex-newsletter').value
            }

            try {
                this.registerForm.removeChild(erMsg);
            } catch (e) { }

            this.registerButton.setAttribute('disabled', true);
            this.firebaseController.register(user.email, user.password).then(async credentials => {
                this.setUserCredentials(credentials.user)

                this.userData = user;
                delete this.userData.password;
                this.userData.score = 0;
                this.userData.uuid = this.userCredential.uid;

                await this.insertUserData();
                this.loadExperience();
                this.registerButton.removeAttribute('disabled');
            }).catch(err => {
                console.error(err);
                this.erMsg.textContent = err.code === "auth/email-already-in-use" ?
                    "The provided email is already in use" : "An error ocurred. Please, try again later";
                form.appendChild(this.erMsg);
                this.registerButton.removeAttribute('disabled');
            });
        } else {
            form.classList.add('oex-submitted');
        }
    }

    /**
     * 
     */
    login() {
        const form = document.querySelector('.oex-login-form form');
        if (form.checkValidity() === true) {
            const user = {
                email: document.getElementById('oex-login-email').value,
                password: document.getElementById('oex-login-password').value
            }

            try {
                this.loginForm.removeChild(erMsg);
            } catch (e) { }

            this.loginButton.setAttribute('disabled', true);
            this.firebaseController.login(user.email, user.password).then(async credentials => {
                this.setUserCredentials(credentials.user)
                this.userData = await this.getUserData();
                this.loadExperience();
                this.loginButton.removeAttribute('disabled');
            }).catch(err => {
                console.error(err);
                this.erMsg.textContent = err.code === "auth/user-not-found" ?
                    "No user registered with the given email" : "An error ocurred. Please, try again later";
                form.appendChild(this.erMsg);
                this.loginButton.removeAttribute('disabled');
            });
        } else {
            form.classList.add('oex-submitted');
        }
    }

    /**
     * Calls firebase to retrieve the user
     * @returns UserData
     */
    async getUserData() {
        this.userData = await this.firebaseController.getUser(this.userCredential.uid);
        return this.userData;
    }

    /**
     * Inserts the user in firebase
     * @returns
     */
    async insertUserData() {
        return await this.firebaseController.insertUser(this.userData);
    }

    /**
     * Process the end of game message from the experience.
     * Navigate to the leaderboard when processed.
     * @param {*} event containing the new score
     */
    processMessage(event) {
        /*if (event.origin != "https://studio.onirix.com") {
            return;
        }*/
        if (event.data != null && event.data.score != null) {
            if (!this.userData.score || this.userData.score < event.data.score) {
                this.userData.score = event.data.score;
                this.firebaseController.updateUser(this.userData).then(() => this.getLeaderboard().then());
            } else {
                this.getLeaderboard().then();
            }
        } else {
            // First communication comes from the experience after it loads
            // When loaded, send the user's data.
            this.studioFrame.contentWindow.postMessage({
                leaderboardEvent: 'sendUserData',
                userData: JSON.stringify(this.userData)
            }, "*");
        }
    }

    async getLeaderboard() {
        // UI
        this.main.classList.remove('oex-hide');
        this.registerForm.classList.add('oex-hide');
        this.loginForm.classList.add('oex-hide');
        this.landing.classList.add('oex-hide');
        this.studioFrame.classList.add('oex-hide');
        this.leaderboard.classList.remove('oex-hide');
        const list = document.querySelector('.oex-leaderboard__list')
        const ul = document.createElement('ul');

        // getData
        const users = await this.firebaseController.getAllUsers();
        let lastScore = Number.MAX_SAFE_INTEGER;
        let lastIndex = 1;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const li = document.createElement('li');

            const num = document.createElement('span');
            const name = document.createElement('span');
            const score = document.createElement('span');

            if (Math.trunc(user.score) !== lastScore) {
                lastScore = Math.trunc(user.score);
                lastIndex = i + 1;
            }

            num.textContent = lastIndex + 'º';
            name.textContent = user.nickname;
            score.textContent = lastScore;

            if (user.email === this.userData.email) {
                const span = document.createElement("span");;
                span.innerHTML = this.userSVG.trim();
                li.classList.add('oex-currentuser');
                li.append(num, name, span.firstChild, score);
            } else {
                li.append(num, name, score);
            }

            ul.appendChild(li);
        }

        list.appendChild(ul);

        document.getElementById('oex-playagain').addEventListener("click", () => {
            list.innerHTML = "";
            this.loadExperience();
        });
    }

    setUserCredentials(credentials) {
        localStorage.setItem('oex-user', JSON.stringify(credentials));
        this.userCredential = credentials;
    }

    toggleForms() {
        this.registerForm.classList.toggle('oex-hide');
        this.loginForm.classList.toggle('oex-hide');
    }

    
}

export default {
    OxLeaderBoard
}