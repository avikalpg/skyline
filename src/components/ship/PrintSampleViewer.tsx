import { useState, useEffect } from 'react';
import { CircularProgress, Modal } from '@mui/joy';
import Image from 'next/image';

interface PrintSampleViewerProps {
	color: string;
}

export default function PrintSampleViewer({ color }: PrintSampleViewerProps) {
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [validImages, setValidImages] = useState<string[]>([]);

	useEffect(() => {
		setIsLoading(true);
		const loadImages = async () => {
			const possibleImages = Array.from({ length: 5 }, (_, i) => `${color}0${i + 1}.jpeg`);
			const valid: string[] = [];

			for (const img of possibleImages) {
				try {
					const fetchedImage = await fetch(`/ship/${img}`, { method: 'HEAD' });
					if (fetchedImage.ok) {
						valid.push(img);
					}
					else {
						console.warn(`Image ${img} does not exist`);
					}
				} catch (error) {
					// Image doesn't exist, skip it
				}
			}

			setValidImages(valid);
			setIsLoading(false);
		};

		loadImages();
	}, [color]);

	const handleImageClick = (imagePath: string) => {
		setSelectedImage(imagePath);
		setOpen(true);
	};

	const getImagePath = (filename: string) => `/ship/${filename}`;

	if (isLoading) {
		return (
			<div style={{ marginTop: '16px', height: '100px', width: '100%', textAlign: 'center' }}>
				<CircularProgress size="lg" />
			</div>
		);
	}

	return (
		<div style={{ marginTop: '16px' }}>
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
				{validImages.map((img, index) => (
					<div
						key={index}
						style={{
							position: 'relative',
							width: '100px',
							height: '100px',
							cursor: 'pointer'
						}}
					>
						<Image
							src={getImagePath(img)}
							alt={`Sample ${color} print ${index + 1}`}
							fill
							style={{
								objectFit: 'cover',
								borderRadius: '8px'
							}}
							onClick={() => handleImageClick(img)}
						/>
					</div>
				))}
			</div>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<div style={{
					position: 'relative',
					height: '90vh',
					aspectRatio: '4/3',
				}}>
					<Image
						src={selectedImage ? getImagePath(selectedImage) : ''}
						alt={`${color} print sample enlarged view`}
						fill
						style={{ objectFit: 'contain' }}
					/>
				</div>
			</Modal>
		</div>
	);
}
