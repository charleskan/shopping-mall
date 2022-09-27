interface Props {

    id: number
    name: string
    description: string
    icon: string
    image1: string
    image2: string
    image3: string
    status_id: number
brand_id: number
created_at: string
updated_at: string

}





export function Items({ currentItems }: Props) {
	return (
		<>
			{currentItems &&
				currentItems.map((item: any) => (
					<div>
						<h3>Item #{item}</h3>
					</div>
				))}
		</>
	)
}