import {
	FormControlLabel,
	Radio
} from '@mui/material'
import detail from '../styles/detailBox.module.css'

interface props {
	name: string
}

export function SelectSize(props: props) {
	return (
		<div >
			<FormControlLabel
		className={detail.color}
				value={props.name}
				control={<Radio />}
				label={props.name}
			/>
		</div>
	)
}