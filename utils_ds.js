function is_valid_region(region)
{
    const valid_regions = ['br', 'eune', 'euw', 'jp', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr'];
    return valid_regions.includes(region.toLowerCase());
}

function format_region(region)
{
    region = region.toLowerCase();
    if (region === 'br') return 'br1';
    if (region === 'eune') return 'eun1';
    if (region === 'euw') return 'euw1';
    if (region === 'jp') return 'jp1';
    if (region === 'kr') return 'kr';
    if (region === 'lan') return 'la1';
    if (region === 'las') return 'la2';
    if (region === 'na') return 'na1';
    if (region === 'oce') return 'oc1';
    if (region === 'ru') return 'ru';
    if (region === 'tr') return 'tr1';
}

module.exports = { is_valid_region, format_region };