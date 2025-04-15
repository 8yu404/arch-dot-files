#! /bin/bash

gpg --command-fd=0 --pinentry-mode=loopback --card-edit <<EOF
admin
kdf-setup
12345678
EOF

export ADMIN_PIN=$(LC_ALL=C tr -dc '0-9' < /dev/urandom | fold -w8 | head -1)
export USER_PIN=$(LC_ALL=C tr -dc '0-9' < /dev/urandom | fold -w6 | head -1)
printf "\nAdmin PIN: %12s\nUser PIN: %13s\n\n" "$ADMIN_PIN" "$USER_PIN"

gpg --command-fd=0 --pinentry-mode=loopback --change-pin <<EOF
3
12345678
$ADMIN_PIN
$ADMIN_PIN
q
EOF

gpg --command-fd=0 --pinentry-mode=loopback --change-pin <<EOF
1
123456
$USER_PIN
$USER_PIN
q
EOF

export IDENTITY="qwquq <qwquq@proton.me>"

gpg --command-fd=0 --pinentry-mode=loopback --edit-card <<EOF
admin
login
$IDENTITY
$ADMIN_PIN
quit
EOF

gpg --edit-card

gpg -k

export KEYID=0xF0F2CFEB04341FB5

gpg --command-fd=0 --pinentry-mode=loopback --edit-key $KEYID <<EOF
trust
ultimate
y
save
EOF

gpg --card-status

ykman openpgp keys set-touch dec on
ykman openpgp keys set-touch sig on
