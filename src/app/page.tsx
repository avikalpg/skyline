import Typography from '@mui/joy/Typography';
import UsernameSearchBar from '../components/UsernameSearchBar';
import SingleFoldPageUIWrapper from '../components/SingleFoldPageUIWrapper';

export default function Home({ searchParams }: {
  searchParams: { err: string | undefined, [key: string]: string | string[] | undefined }
}) {
  const { err } = searchParams;
  return (
    <SingleFoldPageUIWrapper>
      <div>
        <Typography level="h1" component="h1">
          Your GitHub story in 3D
        </Typography>
        <Typography level="body-sm">View a 3D model of your GitHub contribution graph.</Typography>
        <Typography level="body-sm">Share it, print it, and more!</Typography>
      </div>

      <UsernameSearchBar err={err} />
    </SingleFoldPageUIWrapper >
  )
}
