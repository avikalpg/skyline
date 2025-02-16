import React from 'react';
import { Box, Typography } from '@mui/joy';
import ScrollPageUIWrapper from "src/components/ScrollPageUIWrapper";

const CancellationRefundsPolicyPage: React.FC = () => {
	return (
		<ScrollPageUIWrapper>
			<Box sx={{ mt: { xs: 2, sm: 4 }, maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4, md: 8 } }}>
				<Box sx={{ maxWidth: '800px' }}>
					<Typography level="h1" sx={{ mb: 4 }}>
						Cancellation and Refunds Policy
					</Typography>
				</Box>

				<Box sx={{ mt: 4 }}>
					<Typography>
						AVIKALPKUMAR ALOK GUPTA believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
					</Typography>
					<Box component="ul" sx={{ pl: 4 }}>
						<li>
							<Typography>
								Cancellations will be considered only if the request is made within 24 hours of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of fabricating or shipping them.
							</Typography>
						</li>
						<li>
							<Typography>
								AVIKALPKUMAR ALOK GUPTA does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
							</Typography>
						</li>
						<li>
							<Typography>
								In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 1-2 days of receipt of the products.
							</Typography>
						</li>
						<li>
							<Typography>
								In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 1-2 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
							</Typography>
						</li>
						<li>
							<Typography>
								In case of any Refunds approved by the AVIKALPKUMAR ALOK GUPTA, it'll take 6-8 days for the refund to be processed to the end customer.
							</Typography>
						</li>
					</Box>
				</Box>
			</Box>
		</ScrollPageUIWrapper>
	);
};

export default CancellationRefundsPolicyPage;