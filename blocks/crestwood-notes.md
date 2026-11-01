# Crestwood, KY research notes

Raw SERPs (DataForSEO, location "Crestwood,Kentucky,United States"): /home/claude/city-research/crestwood/serp_*.json

## Facts used and sources
- Home rule-class city in Oldham County; "just outside Louisville's Northeast End"; settled early 1800s; Beard's Station 1857, renamed Crestwood 1909; Oldham County Schools serving the area (elementary: Camden Station, Crestwood, Goshen, Centerfield, Locust Grove, Kenwood Station; middle: South Oldham, East Oldham; high: South Oldham, Oldham County, North Oldham); South Oldham Library (Oldham County Public Library branch); Maples Park; mayor (not used): https://en.wikipedia.org/wiki/Crestwood,_Kentucky
- History: Beard's Station in the 1850s railroad era; Joseph Beard donated land for the railroad and built the warehouse that served as the station (where the rail line meets KY 329); shortened to "Beard," engineers yelled "Whiskers," which led to the 1909 rename; incorporated May 1970: https://www.crestwoodky.gov/history/
- City government (City Commissioners, Mayor's Welcome), City Hall at 6830 Highway 22 at The Maples Park: https://www.crestwoodky.gov/
- Parks: The Maples Park (6826 Highway 22, the first park owned and managed by the city; photo captions show Splashpark, Deibel Barn, Playhouse Building); Veterans Memorial Park of Kentucky (Dragon Rd); Briar Hill Park and Peggy Baker Park (county-owned): https://www.crestwoodky.gov/parks/
- City taxes page: "Find real estate tax information at the Oldham County Sheriff's Office website.": https://www.crestwoodky.gov/taxes/
- City schools page: Oldham County School District, links to school assignment locations: https://www.crestwoodky.gov/schools/
- South Oldham High School is in Crestwood at 5901 Veterans Memorial Parkway, Oldham County Schools, mascot Dragons: https://en.wikipedia.org/wiki/South_Oldham_High_School
- KY 329: runs to KY 146 in Crestwood, I-71 interchange Exit 14; KY 329 Bypass is Veterans Memorial Parkway around the north edge of Crestwood: https://en.wikipedia.org/wiki/Kentucky_Route_329
- KY 146: passes through Pewee Valley and Crestwood, known as La Grange Road, starts in St. Matthews, interchange with I-265: https://en.wikipedia.org/wiki/Kentucky_Route_146
- KY 22: passes through Crestwood, carries the name Brownsboro Road, meets I-265 (Gene Snyder Freeway) at exit 23 in Jefferson County: https://en.wikipedia.org/wiki/Kentucky_Route_22
- Drive time to downtown Louisville via I-71, about 20 miles and about 25 minutes in low traffic, 40-50 minutes at peak: https://www.meetways.com/info/driving-time/Crestwood,%20Kentucky/Louisville,%20Kentucky (fetched via Apify). Rome2rio snippet says 18 miles and about 23 minutes: https://www.rome2rio.com/s/Crestwood-Oldham-County-KY-USA/Louisville
- Baptist Health La Grange: 1025 New Moody Lane, La Grange; open 24 hours; serves Oldham, Henry, Trimble, Carroll and eastern Jefferson counties; emergency department and full service lines: https://www.baptisthealth.com/locations/baptist-health-la-grange (via Apify)
- Oldham County government address is 100 West Jefferson Street, La Grange; Sheriff listed for "Property Taxes": https://www.oldhamcountyky.gov/ ; Sheriff site has a "Property Taxes" quick link: https://oldhamsheriff.com/ (via Apify)
- PVA assesses all property and does not set rates or collect taxes; exemptions include homestead (65 and older) and 100% totally disabled, applied for at the PVA: https://www.qpublic.net/ky/oldham/about.html
- Sheriff is the official initially responsible for collecting property tax bills: https://revenue.ky.gov/Property/Pages/WhatOfficialsareInvolved.aspx
- Yew Dell Botanical Gardens, 6220 Old Lagrange Road, Crestwood; National Register of Historic Places 2010: https://touroldham.com/worth-the-drive-celebrate-spring-close-to-home-at-yew-dell-botanical-gardens/
- KHC: affordable mortgages, down payment assistance, approved lender search, eligibility, homebuyer education, housing counselors: https://www.kyhousing.org/page/homebuyers (via Apify)
- Seasonality (fastest sales in May, highest prices in June, Jan-Feb weakest, Dec slowest days on market; buyer urgency cools once the school year starts): https://www.offerpad.com/articles/best-time-to-sell-a-house/ (via Apify)

## People Also Ask found
- living in crestwood ky: Is Crestwood, Kentucky a good place to live? / What are the racial and ethnic demographics of Crestwood, KY? / What is the nicest part of Kentucky to live in? / What is Crestwood, KY known for? / What are some fun things to do in Crestwood, KY? / Is Crestwood considered Louisville? / How far is Crestwood from Louisville? / Is Oldham County the wealthiest county in Kentucky? / What is Louisville's sister city?
- oldham county ky property taxes: What county in Kentucky has the highest property taxes? / How do I check my local property tax? / What is not taxed in Kentucky? / (plus national Social Security/401k questions, not relevant)
- real estate agency, realtors, homes for sale, schools queries: no PAA returned.
- Used: good place to live, known for, considered Louisville, how far from Louisville. Skipped: demographics, wealthiest county (ranking, rule 1), sister city, statewide tax questions (rule 2).

## Flags and omissions
- FLAG: City levy. The FAQ and living section say homes inside Crestwood city limits carry a city levy. The only support is mytownview.com (https://mytownview.com/kentucky/oldham/crestwood/finances/propertytax), which lists "CITY CRESTWOOD (Oldham County)" as a taxing district and cites the KY Department of Revenue Property Tax Rate Book. I could not open the rate book itself or a Crestwood ordinance, and the city's taxes page doesn't say whether the city levies a property tax or who bills it. Please confirm with Crestwood City Hall (502-241-7088) or the KY DOR rate book before publishing.
- FLAG: Who collects the city levy (sheriff or city) is unverified. The copy only says the Sheriff collects property tax bills, and that the city points residents to the Sheriff.
- FLAG: The Oldham County Sheriff tax page itself was not opened. A WebFetch permission prompt timed out and the Apify homepage fetch only showed the "Property Taxes" link. The Sheriff collection role is supported by KY DOR and the county site.
- FLAG: "Some homes with a Crestwood mailing address are zoned for other Oldham County schools (Oldham County High, North Oldham High)" is inferred from Wikipedia listing all three high schools as serving the area, plus the general fact that assignment is by address. No boundary map was opened (oldhamcountyschools.org blocks fetching via robots).
- FLAG: "A Crestwood mailing address doesn't always mean the home is inside the city" is general guidance. It's consistent with county-owned parks having Crestwood addresses, but not proven for any specific street.
- FLAG: "Not part of Louisville Metro government, which covers Jefferson County" and "JCPS" are common knowledge. I didn't open a source for them this session.
- FLAG: Drive time to Louisville comes from a trip-planner site (meetways/rome2rio), not an official source. The copy keeps it approximate ("roughly 20 miles, about 25 minutes outside rush hour").
- FLAG: Seasonality data covers 15 metros, not Louisville. The copy says "across many U.S. metros." The school-year line is an inference from Offerpad's note that urgency cools once school starts, not Crestwood data.
- Left out: Elizabethtown to Crestwood drive time. The only result was for a different Crestwood (Fayette County), so the copy just says the team is based in Elizabethtown and serves the Louisville area. Also left out: private schools (none verified); major employers (none verified); USDA eligibility (suburban area, not checked); hospital bed count (could go stale); population, CNN 2005 "best places" ranking, mayor name (rules 1 and 6); the Harrods Creek Baptist Church "oldest in Oldham County" claim (exact location not confirmed); the Jan 1 assessment date (not on an opened Oldham source this session); horse-farm character (not verified); subdivision names (rule 3).
- Wikipedia's area figures conflict (4.07 vs 3.6 sq mi). Not used.
