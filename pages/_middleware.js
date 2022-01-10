import { NextResponse } from "next/server";
import countries from "../lib/countries.json";

export async function middleware(req) {
    const { nextUrl: url, geo } = req;
    const country = geo.country || "Not Found";
    const city = geo.city || "Not Found";
    const region = geo.region || "NF";

    const countryInfo = countries.find((x) => x.cca2 === country);

    const currencyCode = Object.keys(countryInfo.currencies)[0];
    const currency = countryInfo.currencies[currencyCode];
    const languages = Object.values(countryInfo.languages).join(", ");

    url.searchParams.set("country", country);
    url.searchParams.set("city", city);
    url.searchParams.set("region", region);
    url.searchParams.set("currencyCode", currencyCode);
    url.searchParams.set("currencySymbol", currency.symbol);
    url.searchParams.set("name", currency.name);
    url.searchParams.set("languages", languages);

    return NextResponse.rewrite(url);
}
