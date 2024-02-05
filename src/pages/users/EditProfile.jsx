import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../../requests/user';
import AuthService from "../../services/authService"

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const EditProfile = () => {

    const user = AuthService.getCurrentUser();

    const id = user.user.id;
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    let [profile, setProfile] = useState({
        username: "",
        email: "",
        password: "",
        image: "",
        details: ""
    })

    useEffect(() => {

        const showUser = async () => {
            try {
                const data = await getUser(id);
                setProfile({
                    username: data[0].username,
                    email: data[0].email,
                    password: data[0].password,
                    image: data[0].image,
                    details: data[0].details
                });
            } catch (error) {
                console.error('Erro ao obter informações:', error);
            }
        };

        showUser();

    }, [id]);


    const editUser = async (e) => {

        e.preventDefault();

        try {
            setIsLoading(true);
            updateUser(id, profile.username, profile.email, profile.password, profile.image, profile.details)
            toast.success('Perfil editado com sucesso');
            setIsLoading(false);
            navigate('/profile/');
        } catch (error) {
            toast.error('Erro ao editar Perfil');
            console.error(error);
            setIsLoading(false);
        }
    };


    return (!user || user.length === 0 ? (

        <ErrorScreen message={'Usuário não logado'} />

    ) : (

        <Card title={'Editar Perfil'}>

            <form onSubmit={editUser}>

                <div className='mb-2'>
                    <label htmlFor="username" classtitle="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" value={profile.username} onChange={(e) => setProfile({ ...setProfile, username: e.target.value })} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Username' />
                </div>

                <div className='mb-2'>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                    <input type="E-mail" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='E-mail' />
                </div>

                <div className='mb-2'>
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                    <input type="text" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Senha' />
                </div>

                <div className='mb-2'>
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagem</label>
                    <input type="text" value={profile.image} onChange={(e) => setProfile({ ...profile, image: e.target.value })} id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Link da Imagem' />
                </div>

                <div>
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalhes</label>
                    <input type="text" value={profile.details} onChange={(e) => setProfile({ ...profile, details: e.target.value })} id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Detalhes' />
                </div>


                {/* botões */}

                {!isLoading && (

                    <Check />

                )}

                <Link to={'/profile'}>
                    <Return />
                </Link>

            </form>

        </Card>

    )

    );

}

export default EditProfile