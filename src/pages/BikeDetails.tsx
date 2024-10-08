import Container from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { RentNowModal } from '@/features/rentals';
import { useGetSingleBikeQuery } from '@/redux/features/bike/bikeApi';
import { useParams } from 'react-router-dom';

export default function BikeDetails() {
  const { bikeId } = useParams();
  const { data, isLoading } = useGetSingleBikeQuery(bikeId);

  const bikeData = data?.data;

  if (isLoading) return <BikeDetailsSkeleton />;

  return (
    <Container className="min-h-[calc(100svh-64px)] sm:flex items-center justify-center py-4">
      <div className="border w-full rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 lg:p-16">
        {/* bike image */}
        <div
          className="flex justify-center items-center"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <img
            src={bikeData?.imageURL}
            alt={`${bikeData.name} ${bikeData.model} ${bikeData.year}`}
            className="w-[80%] block m-auto rounded-xl"
          />
        </div>
        {/* bike details */}
        <div
          className="flex justify-center items-center"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <div className="w-full text-center lg:text-left">
            <h1 className="font-semibold text-4xl md:text-5xl text-foreground/80 mb-4">
              {bikeData?.name}
            </h1>
            <p className="xs:text-xl text-foreground/70 mb-4">
              {bikeData.description}
            </p>

            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Badge variant="secondary">
                {bikeData?.pricePerHour} BDT/Hour
              </Badge>
              <Badge
                variant={bikeData?.isAvailable ? 'success' : 'destructive'}
              >
                {bikeData?.isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
            </div>

            <Table className="my-8">
              <TableBody>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{bikeData.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Model</TableCell>
                  <TableCell>{bikeData.model}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>{bikeData.year}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CC</TableCell>
                  <TableCell>{bikeData.cc}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-center lg:justify-start">
              <RentNowModal bike={bikeData} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function BikeDetailsSkeleton() {
  return (
    <Container className="min-h-[calc(100svh-64px)] sm:flex items-center justify-center py-4">
      <div className="border w-full rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 lg:p-16">
        <div className="flex justify-center items-center">
          <Skeleton className="aspect-square w-[80%] bg-foreground/20 rounded-lg" />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full space-y-4 flex flex-col items-center lg:items-start">
            <Skeleton className="h-10 w-3/4 rounded-lg bg-foreground/20" />
            <Skeleton className="h-20 w-full rounded-lg bg-foreground/20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-lg bg-foreground/20" />
              <Skeleton className="h-6 w-24 rounded-lg bg-foreground/20" />
            </div>
            <Table className="my-8">
              <TableBody>
                {[...Array(4)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-1/4">
                      <Skeleton className="h-6 w-full rounded-lg bg-foreground/20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-full rounded-lg bg-foreground/20" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center lg:justify-start">
              <Skeleton className="h-10 w-32 rounded-lg bg-foreground/20" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
