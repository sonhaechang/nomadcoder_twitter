
import AuthForm from "components/AuthForm";
import { authService } from "fbase";
import { GoogleAuthProvider, GithubAuthProvider,signInWithPopup } from "firebase/auth";

function Auth() {
    const onSocialClick = async (e) => {
        const {target: { name }} = e;
        let provider;

        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github'){
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return (
        <div>
            <AuthForm />

            <div>
                <button onClick={onSocialClick} name='google'>
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name='github'>
                    Continue with Github
                </button>
            </div>
        </div>
    );
}

export default Auth;