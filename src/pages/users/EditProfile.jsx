import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser } from '../../requests/user';
import AuthService from "../../services/authService";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";


//componentes:
import ValidateUser from '../../components/validation/ValidateUser';
import Card from '../../components/Card';
import Check from '../../components/buttons/Check';
import Return from '../../components/buttons/Return';
import InputField from '../../components/InputField';
import Delete from '../../components/buttons/Delete';


const EditProfile = () => {

    const user = AuthService.getCurrentUser();
    const id = user.user.id;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const configConfirmation = {
        title: "Tem certeza?",
        text: "Não é possivel reverter esta ação. O usuário será deletado para sempre!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar usuário!"
    }
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

    const removeUser = async () => {
        const confirmation = await Swal.fire(configConfirmation);

        if (confirmation.isConfirmed) {
            try {
                await deleteUser(id);
                AuthService.Logout();
                navigate('/');
                toast.success(`Usuário ${data.name} descadastrado`);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error)
            }
        }

    };

    return (

        <ValidateUser>

<div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

            <Card title={'Editar Perfil'}>

                <form onSubmit={handleSubmit}>

                    <InputField type="text" label="Username" name="username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <InputField type="email" label="E-mail" name="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <InputField type="password" label="Senha" name="password" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <InputField type="text" label="Imagem URL" name="image" value={profile.image} onChange={(e) => setProfile({ ...profile, image: e.target.value })} />
                    <InputField type="text" label="Sobre" name="details" value={profile.details} onChange={(e) => setProfile({ ...profile, details: e.target.value })} />

                    {!isLoading &&

                        <Check />

                    }

                    <Link to={'/profile'}>
                        <Return />
                    </Link>

                    <span onClick={() => removeUser(user.user.id)}>
                        <Delete />
                    </span>


                </form>
            </Card>

            </div>
            </div>

        </ValidateUser>
    )
}

export default EditProfile;