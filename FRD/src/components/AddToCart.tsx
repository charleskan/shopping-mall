import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface props {
	id: number
	color: String
	size: String
}

export function AddToCart(props: props) {
	return (
		<div>
			<FormControl>
				<FormLabel id='demo-radio-buttons-group-label'>
					Color
				</FormLabel>
				<RadioGroup
					aria-labelledby='demo-radio-buttons-group-label'
					name='radio-buttons-group'>
					<FormControlLabel
						value={props.color}
						control={<Radio />}
						label={props.color}
					/>
				</RadioGroup>
			</FormControl>
		</div>
	)
}
