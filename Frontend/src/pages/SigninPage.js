import Header from '../components/Header';
import { Cloud, Landing } from '../components/Background';
import SignIn from '../components/signin';

export default function SigninPage() {
    return (
        <div>
            <Header />
            <div style={{ position: 'relative', height: '100vh', background: '#F5FAFF', overflow: 'hidden' }}>
                
                <SignIn />
            </div>
        </div>
    );
}