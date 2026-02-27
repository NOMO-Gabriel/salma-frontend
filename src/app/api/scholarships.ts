import { getScholarships } from '@/repositories/scholarshipRepository';
import { getDictionary } from '@/dictionaries';

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('lang') || 'fr';
  const dictionary = await getDictionary(locale);
  const scholarships = await getScholarships();

  return new Response(JSON.stringify({
    scholarships,
    dictionary: dictionary.scholarships,
  }));
}