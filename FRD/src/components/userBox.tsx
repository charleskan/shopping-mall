import Image from 'next/image'

interface props {
    name: string
    icon: string
}

export function UserBox(props: props) {
    return (
        <div className="userBox">
            
            
            <div className="userBoxName">{props.name}</div>
            <div className="userBoxIcon">
                <Image src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`} width={50} height={50} />
            </div>
            
        </div>
    )
}