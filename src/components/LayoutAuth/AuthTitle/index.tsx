interface AuthTitleProps {
    title: string;
}

const AuthTitle = ({title}: AuthTitleProps) => {
    return (
        <div className='text-base text-blue-500'>{title}</div>
    )
}

export default AuthTitle