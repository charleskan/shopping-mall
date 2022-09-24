import Image from 'next/image'

interface Props {
	id: number
	name: string
	icon: string
	description: string
}

export function SearchProductInfo(props: Props) {
	return (
		<div>
			<div>{props.id}</div>
			<div>
				<Image
					src={`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/userUploadedFiles/${props.icon}`}
					width={150}
					height={150}
				/>
			</div>
			<div>{props.name}</div>
			<div>{props.description}</div>
		</div>
	)
}
