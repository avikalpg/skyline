import { Box, Typography } from '@mui/joy';
import ScrollPageUIWrapper from "src/components/ScrollPageUIWrapper";

export default function TermsAndConditions() {
	return (
		<ScrollPageUIWrapper>
			<Box sx={{ mt: { xs: 2, sm: 4 }, maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4, md: 8 } }}>
				<Box sx={{ maxWidth: '800px' }}>
					<Typography level="h1" sx={{ mb: 4 }}>
						Terms and Conditions
					</Typography>
				</Box>

				<Box sx={{ mt: 4 }}>
					<Typography>
						For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean AVIKALPKUMAR ALOK GUPTA, whose registered/operational office is KB-1502, Oak Block, Salarpuria Sattva Greenage, Hosur Road, Bommanahalli Bengaluru KARNATAKA 560068. "you", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
					</Typography>

					<Typography level="h2" sx={{ mt: 4, mb: 2 }}>Terms and Conditions</Typography>
					<Typography>
						Your use of the website and/or purchase from us are governed by following Terms and Conditions:
					</Typography>
					<Box component="ul" sx={{ pl: 4 }}>
						<li><Typography>The content of the pages of this website is subject to change without notice.</Typography></li>
						<li><Typography>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</Typography></li>
						<li><Typography>You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Typography></li>
						<li><Typography>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</Typography></li>
						<li><Typography>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Typography></li>
						<li><Typography>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</Typography></li>
						<li><Typography>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</Typography></li>
						<li><Typography>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information. You may not create a link to our website from another website or document without AVIKALPKUMAR ALOK GUPTA’s prior written consent.</Typography></li>
						<li><Typography>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</Typography></li>
						<li><Typography>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</Typography></li>
					</Box>
				</Box>
			</Box>
		</ScrollPageUIWrapper>
	);
}
