echo -e "3\n12345678\n$ADMIN_PIN\n$ADMIN_PIN\nq" | gpg --command-fd=0 --pinentry-mode=loopback --change-pin
echo -e "1\n123456\n$USER_PIN\n$USER_PIN\nq" | gpg --command-fd=0 --pinentry-mode=loopback --change-pin
echo -e "trust\n5\ny\nsave\n" | gpg --command-fd=0 --pinentry-mode=loopback --edit-key $KEYID