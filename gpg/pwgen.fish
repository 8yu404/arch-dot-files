set -x CERTIFY_PASS (LC_ALL=C tr -dc 'A-Z1-9' < /dev/urandom | \
    tr -d "1IOS5U" | fold -w 30 | sed 's/.\{5\}/& /g' | \
    cut -c2- | tr " " "-" | head -1 | sed 's/-$//' )
printf "\n%s\n\n" $CERTIFY_PASS