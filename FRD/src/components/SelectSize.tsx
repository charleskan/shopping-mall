import {
	FormControlLabel,
	Radio
} from '@mui/material'

interface props {
	name: string
}

export function SelectSize(props: props) {
	return (
		<div>
			<FormControlLabel
				value={props.name}
				control={<Radio />}
				label={props.name}
			/>
		</div>
	)
}