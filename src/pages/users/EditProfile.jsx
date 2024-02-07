import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../requests/user';
import AuthService from "../../services/authService";
import Card from '../../components/Card';
import Check from '../../components/buttons/Check';
import Return from '../../components/buttons/Return';
import InputField from '../../components/InputField';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const user = AuthService.getCurrentUser();
    const id = user.user.id;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        password: "",
        image: "",
        details: ""
    });

    useEffect(() => {
        const showUser = async () => {
            try {
                const data = await getUser(id);
                setProfile(data);
            } catch (error) {
                console.error('Erro ao obter informações:', error);
            }
        };

        showUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateUser(id, profile.username, profile.email, profile.password, profile.image, profile.details);
            toast.success('Perfil editado com sucesso, entre novamente para ver as modificações');
            setIsLoading(false);
            navigate('/profile/');
        } catch (error) {
            toast.error(error.response.data.message);
            setIsLoading(false);
        }
    };

    return (!user || user.length === 0 ? (
        <ErrorScreen message={'Usuário não logado'} />
    ) : (

        <Card title={'Editar Perfil'}>

            <form onSubmit={handleSubmit}>

                <InputField type="text" label="Username" name="username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                <InputField type="email" label="E-mail" name="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                <InputField type="password" label="Senha" name="password" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                <InputField type="text" label="Imagem URL" name="image" value={profile.image} onChange={(e) => setProfile({ ...profile, image: e.target.value })} />
                <InputField type="text" label="Detalhes" name="details" value={profile.details} onChange={(e) => setProfile({ ...profile, details: e.target.value })} />

                {!isLoading && <Check />}

                <Link to={'/profile'}>
                    <Return />
                </Link>

            </form>
        </Card>
    ));
}

export default EditProfile;