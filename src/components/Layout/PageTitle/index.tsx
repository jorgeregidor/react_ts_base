interface PageTitleProps {
    title: string;
}

const PageTitle = ({title}: PageTitleProps) => {
    return (
        <>
            <div className="h-20 w-full text-center p-4 text-blue-500">
                <h1>{title}</h1>
            </div>
        </>
    )
}

export default PageTitle;