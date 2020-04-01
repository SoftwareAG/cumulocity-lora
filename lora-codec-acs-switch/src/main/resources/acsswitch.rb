require 'bindata'

class Parameters < BinData::Record
  uint8 :parameter_id
  uint8 :parameter_size
end

class Presence < BinData::Record
  endian :big
  uint32 :timestamp
end

class Payload < BinData::Record
  uint8 :msg_id
  choice :msg, :selection => :msg_id do
    Parameters 0x82
    Presence 0x42
  end
end
