mkdir lineage-20.0
cd lineage-20.0
repo init -u https://github.com/LineageOS/android.git -b lineage-20.0 --git-lfs
repo sync build/make
wget -O - https://raw.githubusercontent.com/waydroid/android_vendor_waydroid/lineage-20/manifest_scripts/generate-manifest.sh | bash
nvim .repo/manifests/default.xml
repo sync

firewall-cmd --zone=internal --add-interface=waydroid0
firewall-cmd --zone=external --add-interface=wlan0
firewall-cmd --zone=drop --set-target=DROP
firewall-cmd --zone=internal --set-target=ACCEPT
firewall-cmd --zone=external --add-masquerade
firewall-cmd --zone=internal --add-rich-rule='rule family="ipv4" source zone="external" accept'
firewall-cmd --zone=external --add-rich-rule='rule family="ipv4" destination zone="internal" accept'
firewall-cmd --reload

firewall-cmd --permanent --zone=internal --add-interface=waydroid0
firewall-cmd --permanent --zone=external --add-interface=wlan0
firewall-cmd --permanent --zone=drop --set-target=DROP
firewall-cmd --permanent --zone=internal --set-target=ACCEPT
firewall-cmd --permanent --zone=external --add-masquerade
firewall-cmd --permanent --zone=internal --add-rich-rule='rule family="ipv4" source zone="external" accept'
firewall-cmd --permanent --zone=external --add-rich-rule='rule family="ipv4" destination zone="internal" accept'
firewall-cmd --reload