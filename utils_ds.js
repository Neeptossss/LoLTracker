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

function sort_rank(users)
{
    const ranks = ['Unranked 0', 'IRON IV', 'IRON III', 'IRON II', 'IRON I',
            'BRONZE IV', 'BRONZE III', 'BRONZE II', 'BRONZE I',
            'SILVER IV', 'SILVER III', 'SILVER II', 'SILVER I',
            'GOLD IV', 'GOLD III', 'GOLD II', 'GOLD I',
            'PLATINUM IV', 'PLATINUM III', 'PLATINUM II', 'PLATINUM I',
            'DIAMOND IV', 'DIAMOND III', 'DIAMOND II', 'DIAMOND I',
            'MASTER', 'GRANDMASTER', 'CHALLENGER'];
    for (var key in users) {
        users[key].leaderboardRank = ranks.indexOf(users[key].rank);
    }
    users = Object.keys(users).sort(function(a, b) {
        return users[b].leaderboardRank - users[a].leaderboardRank;
    }).reduce(function(result, key) {
        result[key] = users[key];
        return result;
    }, {});
    return users;
}

module.exports = { is_valid_region, format_region, sort_rank };