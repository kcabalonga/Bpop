import Header from '../components/Header';
import { Cloud1, Cloud2, Landing } from '../components/clouds';
import SignIn from '../components/signin';

export default function SigninPage() {
    return (
        <div>
            <Header />
            <div style={{ position: 'relative', height: '100vh', background: '#F5FAFF', overflow: 'hidden' }}>
                <Cloud1 />
                <Cloud2 />
                <SignIn />
            </div>
        </div>
    );
}
