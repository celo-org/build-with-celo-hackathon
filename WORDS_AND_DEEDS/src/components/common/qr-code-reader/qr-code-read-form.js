import React, { useState } from 'react';

import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import { QrReader } from 'react-qr-reader';


const QRCodeReadForm = ({ app, onRead }) => {
	var theapp = app

	const [facingMode, setFacingMode] = useState('environment');
	const [facing, setFacing] = useState({variant: 'secondary'});
	const [rear, setRear] = useState({variant: 'primary'});

	const onSwitchCamera = (e) => {
		let _facingMode = facingMode;
		let _facing = facing;
		let _rear = rear;

		switch(_facingMode) {
			case 'user': {
				let value = (e && e.length && e.includes('environment') ? 'environment' : 'user');

				if (value == 'user')
				return;

				_facing.variant = 'secondary';
				_rear.variant = 'primary';

				_facingMode = 'environment';

				setFacingMode(_facingMode);
				setFacing(_facing);
				setRear(_rear);
		}
			break;

			case 'environment': {
				let value = (e && e.length && e.includes('user') ? 'user' : 'environment');

				if (value == 'environment')
				return;

				_facing.variant = 'primary';
				_rear.variant = 'secondary';

				_facingMode = 'user';

				setFacingMode(_facingMode);
				setFacing(_facing);
				setRear(_rear);
			}
			break;

			default:
				break;
		}
	}


	return (
		<div className="QRCodeReader">
		<QrReader
			key={(facingMode == 'user' ? 'user' : 'environment')}
			onResult={onRead}
			style={{ width: '100%' }}
			constraints={{facingMode}}
		/>

		<ToggleButtonGroup
				type="checkbox"
				onChange={onSwitchCamera}
		>
		<ToggleButton value={'user'} variant={facing.variant}>Facing</ToggleButton>
		<ToggleButton value={'environment'} variant={rear.variant}>Rear</ToggleButton>
		</ToggleButtonGroup>

		</div>
	);
};
  

export default QRCodeReadForm;