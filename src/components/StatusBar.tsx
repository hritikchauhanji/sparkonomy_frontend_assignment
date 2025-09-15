export default function StatusBar() {
  return (
    <div className="flex justify-between items-center h-[54px] px-4 pt-2 w-full text-black text-[17px] font-semibold font-sf-pro-display">
      {/* Left - Time */}
      <div>9:41</div>

      {/* Right - Signals */}
      <div className="flex items-center gap-2">
        {/* Network signal (bars) */}
        <img src="/Cellular Connection.png" alt="" />

        {/* WiFi icon */}
        <img src="/Wifi.png" alt="" />

        {/* Battery */}
        <img src="/Battery.png" alt="" />
      </div>
    </div>
  );
}
